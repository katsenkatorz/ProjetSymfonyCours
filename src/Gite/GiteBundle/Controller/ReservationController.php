<?php

namespace Gite\GiteBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Gite\GiteBundle\Entity\Reservation;
use Gite\GiteBundle\Form\ReservationType;
use Gite\GiteBundle\Entity\Gite;
use Gite\GiteBundle\Form\GiteType;

/**
 * Reservation controller.
 *
 */
class ReservationController extends Controller
{

    /**
     * Lists all Reservation entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('GiteBundle:Reservation')->findAll();

        return $this->render('GiteBundle:Reservation:index.html.twig', array(
            'entities' => $entities,
        ));
    }

    /**
     * Creates a new Reservation entity.
     *
     */
    public function createAction(Request $request, $idGite)
    {
        $entity = new Reservation();
        $form = $this->createCreateForm($entity, $idGite);
        $form->handleRequest($request);
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $gite = $em->getRepository('GiteBundle:Gite')->find($idGite);
            $entity->setGite($gite);
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('reservation_show', array('id' => $entity->getId())));
        }

        return $this->render('GiteBundle:Reservation:new.html.twig', array(
            'entity' => $entity,
            'form' => $form->createView(),
        ));
    }

    /**
     * Creates a form to create a Reservation entity.
     *
     * @param Reservation $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Reservation $entity, $idGite)
    {
        $form = $this->createForm(new ReservationType(), $entity, array(
            'action' => $this->generateUrl('reservation_create', array('idGite' => $idGite)),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Reservation entity.
     *
     */
    public function newAction(Request $request, $idGite)
    {
        $defaultData = array('message' => 'Type your message here');

        $formPreResa = $this->formPreResa($defaultData, $date_resa = null, $idGite);
        $formPreResa->handleRequest($request);

        if ($formPreResa->isValid()) {
            $data = $formPreResa->getData();
        } else {
            return "Le format de date n'est pas correct.";
        }
        $entity = new Reservation();

        /* Gite */
        $em = $this->getDoctrine()->getManager();
        $gite = $em->getRepository('GiteBundle:Gite')->findOneById($idGite);

        $date = json_decode($data["date"], true);

        $entity->setArrival(new \DateTime($date["start"]));
        $entity->setDeparture(new \DateTime($date["end"]));

        $entity->setGite($gite);

        $form = $this->createCreateForm($entity, $idGite);
        return $this->render('GiteBundle:Reservation:new.html.twig', array(
            'entity' => $entity,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a Reservation entity.
     *
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GiteBundle:Reservation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Reservation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return $this->render('GiteBundle:Reservation:show.html.twig', array(
            'entity' => $entity,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing Reservation entity.
     *
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GiteBundle:Reservation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Reservation entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return $this->render('GiteBundle:Reservation:edit.html.twig', array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Creates a form to edit a Reservation entity.
     *
     * @param Reservation $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createEditForm(Reservation $entity)
    {
        $form = $this->createForm(new ReservationType(), $entity, array(
            'action' => $this->generateUrl('reservation_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }

    /**
     * Edits an existing Reservation entity.
     *
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GiteBundle:Reservation')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Reservation entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('reservation_edit', array('id' => $id)));
        }

        return $this->render('GiteBundle:Reservation:edit.html.twig', array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a Reservation entity.
     *
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('GiteBundle:Reservation')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Reservation entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('reservation'));
    }

    /**
     * Displays a form to create a new Reservation entity.
     *
     */
    public function preresaAction($idGite)
    {
//        dump($idGite);
//        die();

        $defaultData = array('message' => 'Type your message here');
        $date_resa_array = array();

        $em = $this->getDoctrine()->getManager();
        $reservations = $em->getRepository('GiteBundle:Reservation')->findAll();

        foreach ($reservations as $key => $reservation) {
            if ($reservation->getGite()->getId() && ($reservation->getGite()->getId() == $idGite)) {
                $arrival = date_format($reservation->getArrival(), 'Y-m-d');
                $departure = date_format($reservation->getDeparture(), 'Y-m-d');
                $date_resa_array["arrival"][$key] = $arrival;
                $date_resa_array["departure"][$key] = $departure;
            }
        }

        $date_resa = json_encode($date_resa_array);
        $form = $this->formPreResa($defaultData, $date_resa, $idGite);

        return $this->render('GiteBundle:Reservation:preresa.html.twig', array(
            'pre_resa' => $form->createView(),
        ));
    }

    private function formPreResa($defaultData, $date_resa = null, $idGite)
    {
        return $this->createFormBuilder($defaultData)
            ->setAction($this->generateUrl('reservation_new', array('idGite' => $idGite)))
            ->add('date', 'text')
//            ->add('arrival', 'date', array('widget' => 'single_text', 'format' => 'dd/MM/yyyy'))
//            ->add('departure', 'date', array('widget' => 'single_text', 'format' => 'dd/MM/yyyy'))
//            ->add('idGite', 'hidden', array(
//                'data' => $idGite
//            ))
            ->add('date_resa', 'hidden', array(
                'data' => $date_resa
            ))
            ->add('Reserver', 'submit')
            ->getForm();
    }

    /**
     * Creates a form to delete a Reservation entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('reservation_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm();
    }

}
