<?php

namespace App\Enums;

enum CheckoutStatusType: string
{
  case FINISHED = 'finished';
  case CANCELED = 'canceled';
}