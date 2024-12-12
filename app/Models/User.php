<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[ApiResource(
    paginationItemsPerPage: 10,
)]
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    // Define user types as constants
    public const TYPE_ADMIN = 'admin';
    public const TYPE_USER = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function getUserTypes(): array {
        return [
            self::TYPE_ADMIN,
            self::TYPE_USER,
        ];
    }

    public function isAdmin(): bool
    {
        return $this->user_type === self::TYPE_ADMIN;
    }

    public function isUser(): bool
    {
        return $this->user_type === self::TYPE_USER;
    }

    public function companies()
    {
        return $this->hasMany(Company::class, 'owner_id');
    }

    public function employeeCompanies()
    {
        return $this->belongsToMany(Company::class, 'employees', 'user_id', 'company_id');
    }
}
