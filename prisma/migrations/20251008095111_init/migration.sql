-- CreateTable
CREATE TABLE "output_codes" (
    "id" SERIAL NOT NULL,
    "outputType" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "output_codes_pkey" PRIMARY KEY ("id")
);
