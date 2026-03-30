import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, extname } from 'path'
import crypto from 'crypto'

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) return false

  return crypto.timingSafeEqual(aBuffer, bBuffer)
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    const validToken = process.env.NEXT_PUBLIC_UPLOAD_TOKEN || ''

    if (!safeCompare(token, validToken)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'فایلی ارسال نشده است' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const hash = crypto.createHash('md5').update(buffer).digest('hex')
    const extension = extname(file.name)
    const fileName = `${hash}${extension}`

    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filePath = join(uploadDir, fileName)

    const publicUrl = `${process.env.NEXT_PUBLIC_UPLOAD_BASE_URL}${fileName}`

    if (existsSync(filePath)) {
      return NextResponse.json({
        id: hash,
        url: publicUrl,
        status: "exists"
      })
    }

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    await writeFile(filePath, buffer)

    return NextResponse.json({
      id: hash,
      url: publicUrl,
      status: "uploaded"
    })

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}