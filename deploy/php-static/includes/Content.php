<?php

final class Content
{
    private static ?array $site = null;
    private static ?array $extras = null;
    private static ?array $insights = null;

    public static function dir(): string
    {
        return dirname(__DIR__) . '/content';
    }

    public static function load(): array
    {
        if (self::$site !== null) {
            return self::$site;
        }
        $path = self::dir() . '/site-content.json';
        if (!is_file($path)) {
            throw new RuntimeException('Missing content/site-content.json — run npm run build:php-static');
        }
        self::$site = json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
        return self::$site;
    }

    public static function extras(): array
    {
        if (self::$extras !== null) {
            return self::$extras;
        }
        $path = self::dir() . '/extras.json';
        self::$extras = is_file($path)
            ? json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR)
            : [];
        return self::$extras;
    }

    public static function insights(): array
    {
        if (self::$insights !== null) {
            return self::$insights;
        }
        $path = self::dir() . '/insights.json';
        self::$insights = is_file($path)
            ? json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR)
            : [];
        return self::$insights;
    }

    public static function insightBySlug(string $slug): ?array
    {
        foreach (self::insights() as $item) {
            if (($item['slug'] ?? '') === $slug) {
                return $item;
            }
        }
        return null;
    }

    public static function site(): array
    {
        return self::load()['site'] ?? [];
    }

    public static function pages(): array
    {
        return self::load()['pages'] ?? [];
    }
}
