<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\MemberController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/sobre', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/sobre/equipo', [MemberController::class, 'members'])->name('members');

Route::get('/areas', function () {
    return Inertia::render('areas');
})->name('areas');

Route::get('/eventos', [EventController::class, 'index'],
)->name('events.index');

Route::get('/eventos/{event:slug}', [EventController::class, 'show'])
     ->name('events.show');

Route::prefix('recursos')->name('resources.')->group(function () {
    Route::get('/guias', [ResourceController::class, 'guides'])->name('guides');
    Route::get('/herramientas', [ResourceController::class, 'tools'])->name('tools');
    Route::get('/biblioteca', [ResourceController::class, 'library'])->name('library');
    Route::get('/material', [ResourceController::class, 'material'])->name('material');
    Route::get('/enlaces', [ResourceController::class, 'links'])->name('enlaces');
});

Route::get('/noticias', [NewsController::class, 'index'])
->name('news.index');

Route::get('/noticias/{news:slug}', [NewsController::class, 'show'])
->name('news.show');

Route::get('/contacto', function () {
    return Inertia::render('contact');
})->name('contact');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
