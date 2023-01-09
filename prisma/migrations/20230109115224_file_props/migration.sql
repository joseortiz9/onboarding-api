-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "isCorrect" SET DEFAULT false;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "bucket" TEXT,
ADD COLUMN     "metadataUrl" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
