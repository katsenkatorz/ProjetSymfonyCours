<?php

namespace Gite\GiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ReservationController extends Controller
{
    public function createReservationAction($id)
    {
        
        return $this->render('GiteBundle:Reservation:create.html.twig', array('id' => $id));
    }
}
