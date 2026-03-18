<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use Illuminate\Database\Seeder;

class EventCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Cursos',
                'slug' => 'cursos',
                'sort_order' => 1,
            ],
            [
                'name' => 'Webinars',
                'slug' => 'webinars',
                'sort_order' => 2,
            ],
            [
                'name' => 'Congresos / Jornadas',
                'slug' => 'congresos-jornadas',
                'sort_order' => 3,
            ],
            [
                'name' => 'Material Docente',
                'slug' => 'material-docente',
                'sort_order' => 4,
            ],
            [
                'name' => 'Aval de GEEVIH',
                'slug' => 'aval-de-geevih',
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $category) {
            EventCategory::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
