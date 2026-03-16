// import { useFormik } from 'formik'
// import { useTranslation } from 'react-i18next'
// import { createModalSchema } from '../../validationSchemas/authSchemas'
// import { useGetChannelsQuery } from '../../state/chatApi'

// const AddChannelModal = ({ onClose, onSubmit }) => {
//   const { t } = useTranslation()

//   const { data: channels = [] } = useGetChannelsQuery()
//   const existingNames = channels.map(ch => ch.name.toLowerCase().trim())

//   const formik = useFormik({
//     initialValues: { channelname: '' },
//     validationSchema: createModalSchema(t, existingNames),
//     validateOnChange: false,
//     validateOnBlur: false,
//     onSubmit: async (values, { resetForm, setSubmitting }) => {
//       try {
//         await onSubmit(values.channelname.trim())
//         resetForm()
//         onClose()
//       }
//       finally {
//         setSubmitting(false)
//       }
//     },
//   })

//   const handleCancel = () => {
//     formik.resetForm()
//     onClose()
//   }

//   const isSubmitDisabled = formik.isSubmitting

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <div>
//         <input
//           name="channelname"
//           id="channelname"
//           className={`mb-2 form-control ${
//             formik.errors.channelname && formik.touched.channelname ? 'is-invalid' : ''
//           }`}
//           value={formik.values.channelname}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           autoFocus
//           onFocus={e => e.target.select()}
//           disabled={formik.isSubmitting}
//         />
//         <label htmlFor="channelname" className="visually-hidden">
//           {t('channel.channelname')}
//         </label>

//         <div className="invalid-feedback">
//           {formik.errors.channelname && formik.touched.channelname ? formik.errors.channelname : ''}
//         </div>

//         <div className="d-flex justify-content-end">
//           <button
//             type="button"
//             className="me-2 btn btn-secondary"
//             onClick={handleCancel}
//             disabled={formik.isSubmitting}
//           >
//             {t('channel.cancel')}
//           </button>

//           <button type="submit" className="btn btn-primary" disabled={isSubmitDisabled}>
//             {t('channel.send')}
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default AddChannelModal

import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { createModalSchema } from '../../validationSchemas/authSchemas'
import { useGetChannelsQuery } from '../../state/chatApi'

const AddChannelModal = ({ onClose, onSubmit }) => {
  const { t } = useTranslation()

  const { data: channels = [] } = useGetChannelsQuery()
  const existingNames = channels.map(ch => ch.name.toLowerCase().trim())

  const formik = useFormik({
    initialValues: { channelname: '' },
    validationSchema: createModalSchema(t, existingNames),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await onSubmit(values.channelname.trim())
        resetForm()
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  const handleCancel = () => {
    formik.resetForm()
    onClose()
  }

  const isSubmitDisabled = formik.isSubmitting

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          name="channelname"
          id="channelname"
          className={`mb-2 form-control ${
            formik.errors.channelname && formik.touched.channelname ? 'is-invalid' : ''
          }`}
          value={formik.values.channelname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoFocus
          onFocus={e => e.target.select()}
          disabled={formik.isSubmitting}
        />
        <label htmlFor="channelname" className="visually-hidden">
          {t('channel.channelname')}
        </label>

        <div className="invalid-feedback">
          {formik.errors.channelname && formik.touched.channelname ? formik.errors.channelname : ''}
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={handleCancel}
            disabled={formik.isSubmitting}
          >
            {t('channel.cancel')}
          </button>

          <button type="submit" className="btn btn-primary" disabled={isSubmitDisabled}>
            {t('channel.send')}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddChannelModal
