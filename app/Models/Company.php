<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ApiResource]
class Company extends Model
{
    use HasFactory;

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function jobRoles()
    {
        return $this->hasMany(JobRole::class);
    }
}
