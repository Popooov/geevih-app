<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Event;
use App\Models\News;
use App\Models\Resource as ContentResource;
use App\Observers\EventObserver;
use App\Observers\NewsObserver;
use App\Observers\ContentResourceObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::observe(EventObserver::class);
        News::observe(NewsObserver::class);
        ContentResource::observe(ContentResourceObserver::class);
    }
}
