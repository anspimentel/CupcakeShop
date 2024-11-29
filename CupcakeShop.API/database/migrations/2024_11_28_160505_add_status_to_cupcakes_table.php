<?php

use App\Enums\CupcakeStatusType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private $table = 'cupcakes';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->enum('status', [
                CupcakeStatusType::IN_STOCK->value,
                CupcakeStatusType::OUT_OF_STOCK->value,
            ])->default(CupcakeStatusType::OUT_OF_STOCK->value);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
