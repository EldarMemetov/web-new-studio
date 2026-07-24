'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './FeedbackForm.module.scss';
import Container from '@/shared/container/Container';
import { sendFeedback } from '@/services/api';
import Button from '@/shared/components/button/Button';
import {
  TextField,
  TextAreaField,
  CheckboxField,
} from '@/shared/components/InputForm/InputForm';
import ModalFeedback from './ModalFeedback/ModalFeedback';

export default function FeedbackForm() {
  const { t, i18n } = useTranslation('feedbackForm');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    message: '',
    agree: false,
    lang: i18n.language,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('validation.name.min'))
      .required(t('validation.name.required')),
    email: Yup.string()
      .email(t('validation.email.invalid'))
      .required(t('validation.email.required')),
    message: Yup.string()
      .min(10, t('validation.message.min'))
      .required(t('validation.message.required')),
    agree: Yup.boolean()
      .oneOf([true], t('validation.agree'))
      .required(t('validation.agree')),
    lang: Yup.string().strip(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setSubmissionStatus(null);
    try {
      await sendFeedback(values);
      resetForm();
      setSubmissionStatus({ type: 'success' });
      setModalVisible(true);
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: error.message || t('errorMessage'),
      });
      setModalVisible(true);
    }
  };

  return (
    <Container>
      <section className={styles.section} id="feedback-form">
        <h2 className={styles.title}>
          {t('title')} <span className={styles.andTitle}>{t('andTitle')}</span>
        </h2>

        <div className={styles.bigContainer}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.infoPanel}>
            <h3 className={styles.description}>{t('description')}</h3>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>

          <div className={styles.formPanel}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {({ isValid }) => (
                <Form className={styles.form}>
                  <TextField
                    name="name"
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t('fields.name')}
                  />
                  <TextField
                    name="email"
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t('fields.email')}
                  />
                  <TextAreaField
                    name="message"
                    id="message"
                    autoComplete="off"
                    placeholder={t('fields.message')}
                  />

                  <div className={styles.checkboxContainer}>
                    <CheckboxField name="agree" id="agree">
                      {t('fields.agreeBefore')}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.agreeLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('fields.agreeLink')}
                      </a>
                      {t('fields.agreeAfter')}
                    </CheckboxField>
                  </div>

                  <div className={styles.buttonWrapper}>
                    <Button
                      type="submit"
                      variant={isValid ? 'variant6' : 'variant5'}
                    >
                      {t('submitButton')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>

      <ModalFeedback
        show={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
}
