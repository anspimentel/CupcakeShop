<?php

namespace App\Enums;

enum PaymentType: string
{
  case MONEY = 'money';
  case CREDIT_CARD = 'credit_card';
  case PIX = 'pix';
}
