<?php

namespace Gite\GiteBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ReservationType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('arrival', 'datetime', array('widget' => 'single_text', 'format' => 'dd MM yyyy'))
            ->add('departure', 'datetime', array('widget' => 'single_text', 'format' => 'dd MM yyyy'))
            ->add('content')
            ->add('capacity')
            ->add('Créer', 'submit', array('attr' => array('class' => 'btn btn-success')))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Gite\GiteBundle\Entity\Reservation'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'gite_gitebundle_reservation';
    }
}
