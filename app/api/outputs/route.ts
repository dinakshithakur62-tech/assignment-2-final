import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET() {
  const startTime = Date.now();
  try {
    logger.info('API: Fetching all outputs');

    const outputs = await prisma.outputCode.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const duration = Date.now() - startTime;
    logger.metric('GET /api/outputs', duration, { count: outputs.length });

    return NextResponse.json(outputs, { status: 200 });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('GET /api/outputs error', { error, duration });
    return NextResponse.json(
      { error: 'Failed to fetch outputs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const { outputType, htmlContent } = body;

    logger.info('API: Creating new output', { outputType });

    if (!outputType || !htmlContent) {
      logger.warn('API: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: outputType and htmlContent' },
        { status: 400 }
      );
    }

    const output = await prisma.outputCode.create({
      data: {
        outputType,
        htmlContent,
      },
    });

    const duration = Date.now() - startTime;
    logger.metric('POST /api/outputs', duration, { id: output.id, type: outputType });

    return NextResponse.json(output, { status: 201 });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('POST /api/outputs error', { error, duration });
    return NextResponse.json(
      { error: 'Failed to create output' },
      { status: 500 }
    );
  }
}
