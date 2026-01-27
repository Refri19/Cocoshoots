/*
  Warnings:

  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `venue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `date` on the `blog` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `feedback` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `category` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morecontent` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "venue_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "photo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "venue";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "facebookpost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "reasoning" TEXT NOT NULL,
    "scheduleAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogimage" BLOB,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "morecontent" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);
INSERT INTO "new_blog" ("createdAt", "excerpt", "id", "title") SELECT "createdAt", "excerpt", "id", "title" FROM "blog";
DROP TABLE "blog";
ALTER TABLE "new_blog" RENAME TO "blog";
CREATE TABLE "new_feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_feedback" ("category", "createdAt", "id", "message", "name") SELECT "category", "createdAt", "id", "message", "name" FROM "feedback";
DROP TABLE "feedback";
ALTER TABLE "new_feedback" RENAME TO "feedback";
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("id", "password", "username") SELECT "id", "password", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
