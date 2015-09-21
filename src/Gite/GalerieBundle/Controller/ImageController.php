<?php

namespace Gite\GalerieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Gite\GalerieBundle\Entity\Image;
use Gite\GalerieBundle\Form\ImageType;

class ImageController extends Controller
{
    /**
     * Creates a form to create a Image entity.
     *
     * @param Image $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Image $entity)
    {
        $form = $this->createForm(new ImageType(), $entity, array(
            'action' => $this->generateUrl('new_image'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Image entity.
     */
    public function newImageAction(Request $request)
    {
        $entity = new Image();

        // $em = $this->getDoctrine()->getManager();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            // return $this->redirect($this->generateUrl('gite_show', array('id' => $entity->getId())));
        }

        return $this->render('GalerieBundle:Image:new.html.twig', array(
            'entity' => $entity,
            'form' => $form->createView(),
        ));
    }

}
