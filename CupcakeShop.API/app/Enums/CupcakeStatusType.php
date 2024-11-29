<?php

namespace App\Enums;

enum CupcakeStatusType: string
{
  case OUT_OF_STOCK = 'out_of_stock';
  case IN_STOCK = 'in_stock';
}