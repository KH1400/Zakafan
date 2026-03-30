import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    // مسیر واقعی فایل داخل کانتینر
    const filePath = path.join(
      process.cwd(),
      'public',
      'uploads',
      ...params.path
    )

    // اگر فایل نبود
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)

    const fileName = path.basename(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}