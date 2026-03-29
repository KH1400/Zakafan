import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname } from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'فایلی ارسال نشده است' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ۱. محاسبه هش برای نام فایل یکتا و تشخیص تکراری بودن
    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    const extension = extname(file.name);
    const fileName = `${hash}${extension}`;
    
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);
    
    // این همان URL پابلیک است که می‌خواهید
    const publicUrl = `/uploads/${fileName}`;

    // ۲. بررسی موجود بودن فایل
    if (existsSync(filePath)) {
      return NextResponse.json({
        id: hash,
        url: publicUrl,
        status: "exists"
      });
    }

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    await writeFile(filePath, buffer);

    return NextResponse.json({
      id: hash,
      url: publicUrl,
      status: "uploaded"
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}