<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Cat;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cat_id')->nullable();
            $table->string('img', 255)->nullable();
            $table->string('title', 255);
            $table->string('description', 512)->nullable();
            $table->longText('content')->nullable();
            $table->json('tags')->default('[]');
            $table->timestamps();

            $table->foreign('cat_id')->references('id')->on((new Cat)->getTable());
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
