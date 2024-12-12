<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employee::create([
            'user_id'    => 2, // Normal User
            'company_id' => 1, // Tech Corp
        ]);

        Employee::create([
            'user_id'    => 3, // Another user
            'company_id' => 2, // Innovate Ltd
        ]);

        Employee::factory(10)->create(); // Use factory for additional employees
    }
}
