-- CreateTable
CREATE TABLE "url" (
    "id" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_slug_key" ON "url"("slug");

-- CreateIndex
CREATE INDEX "url_slug_original_url_idx" ON "url"("slug", "original_url");
