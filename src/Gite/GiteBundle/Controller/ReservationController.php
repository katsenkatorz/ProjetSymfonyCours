<?php

namespace Gite\GiteBundle\Controller;

use Gite\GiteBundle\Entity\Reservation;
use Gite\GiteBundle\Form\ReservationType;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class ReservationController extends Controller
{
    /**
     * @Template("GiteBundle:Reservation:create.html.twig")
     */
    public function newReservationAction(Request $request)
    {
        $reservation = new Reservation();

        $form = $this->createForm(
            new ReservationType(),
            $reservation,
            array()
        );

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($reservation);
            $em->flush();

            return $this->redirect($this->generateUrl('gite_listview'));
        }
        return array(
            'formulaire_reservation' => $form->createView(),
        );
    }
}
