<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\MemberController;

Route::get('/', fn () => Inertia::render('home'))->name('home');

Route::prefix('sobre')->name('about.')->group(function () {
    Route::inertia('/mision-y-objetivos', 'about/mission')->name('mission');
    Route::get('/sobre-nosotros', [MemberController::class, 'members'])->name('about');
    Route::inertia('/hacerte-socio', 'about/membership')->name('membership');
    Route::inertia('/areas-de-trabajo', 'about/areas')->name('areas');
});

Route::prefix('eventos')->name('eventos.')->group(function () {
    Route::get('/', [EventController::class, 'index'])->name('events.index');
    Route::get('/{event:slug}', [EventController::class, 'show'])->name('events.show');
});

Route::prefix('recursos')->name('resources.')->group(function () {
    Route::get('/guias', [ResourceController::class, 'guides'])->name('guides');
    Route::get('/herramientas', [ResourceController::class, 'tools'])->name('tools');
    Route::get('/biblioteca', [ResourceController::class, 'library'])->name('library');
    Route::get('/material', [ResourceController::class, 'material'])->name('material');
    Route::get('/enlaces', [ResourceController::class, 'links'])->name('links');
});

Route::prefix('noticias')->name('noticias.')->group(function () {
    Route::get('/', [NewsController::class, 'index'])->name('news.index');
    Route::get('/{news:slug}', [NewsController::class, 'show'])->name('news.show');
});

Route::get('/contacto', function () {
    return Inertia::render('contact');
})->name('contact');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
