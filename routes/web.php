<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventController;

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

Route::get('/recursos', function () {
    return Inertia::render('resources');
})->name('resources');

Route::get('/noticias', function () {
    return Inertia::render('news');
})->name('news');

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
