<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'     => 'Admin User',
            'email'    => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'type'     => User::TYPE_ADMIN,
            'remember_token'    => Str::random(10),
        ]);

        User::create([
            'name'     => 'Normal User',
            'email'    => 'user@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'type'     => User::TYPE_USER,
            'remember_token'    => Str::random(10),
        ]);

        User::factory(1000)->create();
    }
}
