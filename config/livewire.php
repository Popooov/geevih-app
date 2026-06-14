<?php

$config = require base_path('vendor/livewire/livewire/config/livewire.php');

$config['temporary_file_upload']['rules'] = [
    'required',
    'file',
    'max:' . env('LIVEWIRE_UPLOAD_MAX_KB', 20480),
];

return $config;
