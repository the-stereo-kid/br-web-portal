export const useMailerLite = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const subscribeToNewsletter = async (data: { firstName: string, lastName: string, email: string }) => {
    isLoading.value = true
    error.value = null
    success.value = false

    try {
      const response = await $fetch('/api/subscribe', {
        method: 'POST',
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        }
      })

      success.value = true
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to subscribe. Please try again.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const submitContactForm = async (data: { name: string, email: string, message: string }) => {
    isLoading.value = true
    error.value = null
    success.value = false

    try {
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: {
          name: data.name,
          email: data.email,
          message: data.message
        }
      })

      success.value = true
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to send message. Please try again.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    error.value = null
    success.value = false
    isLoading.value = false
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    success: readonly(success),
    subscribeToNewsletter,
    submitContactForm,
    reset
  }
}
