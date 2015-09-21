<?php

namespace Gite\GalerieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

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
    public function newImageAction()
    {
        $entity = new Image();

        $em = $this->getDoctrine()->getManager();
        $form = $this->createCreateForm($entity);

        return $this->render('GalerieBundle:Image:new.html.twig', array(
            'entity' => $entity,
            'form' => $form->createView(),
        ));
    }
}
