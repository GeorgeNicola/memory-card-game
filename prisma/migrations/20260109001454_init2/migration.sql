/*
  Warnings:

  - You are about to drop the column `dificulty` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `timp` on the `Score` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "dificulty",
DROP COLUMN "timp",
ADD COLUMN     "difficulty" INTEGER NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;
