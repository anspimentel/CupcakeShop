<?php

namespace App\Enums;

enum DeliveryType: string
{
  case RECEIVE = 'receive';
  case WITHDRAW = 'withdraw';
}
