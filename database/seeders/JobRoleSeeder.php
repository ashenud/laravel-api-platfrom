<?php

namespace Database\Seeders;

use App\Models\JobRole;
use Illuminate\Database\Seeder;

class JobRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobRole::create([
            'name'       => 'Software Engineer',
            'company_id' => 1, // Belongs to Tech Corp
        ]);

        JobRole::create([
            'name'       => 'Project Manager',
            'company_id' => 1,
        ]);

        JobRole::create([
            'name'       => 'HR Manager',
            'company_id' => 2, // Belongs to Innovate Ltd
        ]);

        JobRole::factory(10)->create(); // Use factory for additional roles
    }
}
