<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create([
            'name'     => 'Tech Corp',
            'owner_id' => 1, // Assuming the first user is an admin
        ]);

        Company::create([
            'name'     => 'Innovate Ltd',
            'owner_id' => 1, // Same admin owns multiple companies
        ]);

        Company::factory(1000)->create();
    }
}
