<?php

namespace App\Exceptions;

use Exception;

class OutStockException extends Exception
{
    public function __construct(string $cupcake, int $code = 400)
    {
        parent::__construct("There aren't enough cupcakes is stock for cupcake " . $cupcake, $code);
    }
}
