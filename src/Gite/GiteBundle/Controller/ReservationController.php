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
    public function createAction(Request $request)
    {
        $entity = new Reservation();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
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
    private function createCreateForm(Reservation $entity)
    {
        $form = $this->createForm(new ReservationType(), $entity, array(
            'action' => $this->generateUrl('reservation_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Reservation entity.
     *
     */
    public function newAction(Request $request)
    {
        $defaultData = array('message' => 'Type your message here');

        $formPreResa = $this->formPreResa($defaultData);
        $formPreResa->handleRequest($request);

        if ($formPreResa->isValid()) {
            $data = $formPreResa->getData();
        }else{
            return "Le format de date n'est pas correct.";
        }
        $entity = new Reservation();

        /* Gite */
        $giteId = $data['idGite'];
        $em = $this->getDoctrine()->getManager();
        $gite = $em->getRepository('GiteBundle:Gite')->findOneById($giteId);

        $arrival = substr($data['date'], 0, -13);
        $departure = substr($data['date'], -10, 10);

        $entity->setArrival(new \DateTime(str_replace('/','-',$arrival)));
        $entity->setDeparture(new \DateTime(str_replace('/','-',$departure)));
        $entity->setGite($gite);

        $form = $this->createCreateForm($entity);
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

        $defaultData = array('message' => 'Type your message here');

        $form = $this->formPreResa($defaultData, $idGite);

        return $this->render('GiteBundle:Reservation:preresa.html.twig', array(
            'pre_resa' => $form->createView(),
        ));
    }

    private function formPreResa($defaultData, $idGite=null)
    {
        return $this->createFormBuilder($defaultData)
            ->setAction($this->generateUrl('reservation_new'))
            ->add('date', 'text')
            // ->add('arrival', 'date', array('widget' => 'single_text', 'format' => 'dd/MM/yyyy'))
            // ->add('departure', 'date', array('widget' => 'single_text', 'format' => 'dd/MM/yyyy'))
            ->add('idGite', 'hidden',array(
                'data' => $idGite
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
