<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ResourceController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/sobre', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/areas', function () {
    return Inertia::render('areas');
})->name('areas');

Route::get('/eventos', [EventController::class, 'index'],
)->name('events');

Route::get('/eventos/{event}', [EventController::class, 'show'])
     ->name('events.show');

// Route::get('/recursos', function () {
//     return Inertia::render('resources');
// })->name('resources');

Route::prefix('recursos')->name('resources.')->group(function () {
    Route::get('/', [ResourceController::class, 'index'])->name('index');
    Route::get('/guias', [ResourceController::class, 'guides'])->name('guides');
    Route::get('/herramientas', [ResourceController::class, 'herramientas'])->name('herramientas');
    Route::get('/biblioteca', [ResourceController::class, 'biblioteca'])->name('biblioteca');
    Route::get('/material', [ResourceController::class, 'material'])->name('material');
    Route::get('/enlaces', [ResourceController::class, 'enlaces'])->name('enlaces');
});

Route::get('/noticias', [NewsController::class, 'index'])
->name('news.index');

Route::get('/noticias/{news}', [NewsController::class, 'show'])
->name('news.show');

Route::get('/contacto', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/enlaces', function () {
    return Inertia::render('links');
})->name('links');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
