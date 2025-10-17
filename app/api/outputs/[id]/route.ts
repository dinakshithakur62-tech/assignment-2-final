import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const output = await prisma.outputCode.findUnique({
      where: { id },
    });

    if (!output) {
      return NextResponse.json(
        { error: 'Output not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error('GET /api/outputs/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch output' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { outputType, htmlContent } = body;

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const output = await prisma.outputCode.update({
      where: { id },
      data: {
        ...(outputType && { outputType }),
        ...(htmlContent && { htmlContent }),
      },
    });

    console.log('Updated output:', output.id);

    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error('PUT /api/outputs/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update output' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    await prisma.outputCode.delete({
      where: { id },
    });

    console.log('Deleted output:', id);

    return NextResponse.json(
      { message: 'Output deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/outputs/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete output' },
      { status: 500 }
    );
  }
}
