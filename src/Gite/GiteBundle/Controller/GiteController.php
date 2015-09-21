<?php

namespace Gite\GiteBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Gite\GiteBundle\Entity\Gite;
use Gite\GiteBundle\Form\GiteType;
use Gite\GalerieBundle\Entity\Galerie;
use Gite\GalerieBundle\Form\GalerieType;

/**
 * Gite controller.
 */
class GiteController extends Controller
{
    public function getGiteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $gite = $em->getRepository('GiteBundle:Gite')->find($id);

        return $this->render('GiteBundle:Gite:view.html.twig', array(
            'gite' => $gite,
        ));
    }

    public function ListGitesAction()
    {
        return $this->render('GiteBundle:Gite:listview.html.twig');
    }

    public function getListGitesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $gites = $em->getRepository('GiteBundle:Gite')->findAll();

        return $this->render('GiteBundle:ModuleUsed:listgite.html.twig', array('gites' => $gites));
    }

    /**
     * Lists all Gite entities.
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('GiteBundle:Gite')->findAll();

        return $this->render('GiteBundle:Gite:index.html.twig', array(
            'entities' => $entities,
        ));
    }

    /**
     * Creates a new Gite entity.
     */
    public function createAction(Request $request)
    {
        $entity = new Gite();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('gite_show', array('id' => $entity->getId())));
        }

        return $this->render('GiteBundle:Gite:new.html.twig', array(
            'entity' => $entity,
            'form' => $form->createView(),
        ));
    }

    /**
     * Creates a form to create a Gite entity.
     *
     * @param Gite $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Gite $entity)
    {
        $form = $this->createForm(new GiteType(), $entity, array(
            'action' => $this->generateUrl('gite_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Gite entity.
     */
    public function newAction()
    {
        $entity = new Gite();
        $form = $this->createCreateForm($entity);

        return $this->render('GiteBundle:Gite:new.html.twig', array(
            'entity' => $entity,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a Gite entity.
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GiteBundle:Gite')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Gite entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return $this->render('GiteBundle:Gite:show.html.twig', array(
            'entity' => $entity,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing Gite entity.
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GiteBundle:Gite')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Gite entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return $this->render('GiteBundle:Gite:edit.html.twig', array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Creates a form to edit a Gite entity.
     *
     * @param Gite $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createEditForm(Gite $entity)
    {
        $form = $this->createForm(new GiteType(), $entity, array(
            'action' => $this->generateUrl('gite_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }

    /**
     * Edits an existing Gite entity.
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('GiteBundle:Gite')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Gite entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('gite_edit', array('id' => $id)));
        }

        return $this->render('GiteBundle:Gite:edit.html.twig', array(
            'entity' => $entity,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a Gite entity.
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('GiteBundle:Gite')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Gite entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('gite'));
    }

    /**
     * Creates a form to delete a Gite entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('gite_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm();
    }
}
