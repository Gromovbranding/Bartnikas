import Crowdin, { type Credentials } from '@crowdin/crowdin-api-client'

export const useCrowdin = () => {
// credentials
  const credentials: Credentials = {
    token: 'personalAccessToken'
  }

  // initialization of crowdin client
  const { projectsGroupsApi, uploadStorageApi, sourceFilesApi, translationsApi } =
    new Crowdin(credentials)

  // get project list
  projectsGroupsApi
    .listProjects()
    .then(projects => console.log(projects))
    .catch(error => console.error(error))

  // You can also use async/wait. Add `async` keyword to your outer function/method
  async function getProjects () {
    try {
      const projects = await projectsGroupsApi.listProjects()
      console.log(projects)
    } catch (error) {
      console.error(error)
    }
  }

  // Create file with json content to translate
  async function createFile () {
    const projectId = 123
    const fileData = {
      title: 'Example',
      description: 'Some Text'
    }
    const storage = await uploadStorageApi.addStorage('file1.json', fileData)
    const file = await sourceFilesApi.createFile(projectId, {
      name: 'file1.json',
      title: 'Sample file',
      storageId: storage.data.id,
      type: 'json'
    })
    console.log(file)
  }

  // Download translations
  async function downloadTranslations (targetLanguageId: string) {
    const projectId = 123
    const fileId = 456
    const downloadLink = await translationsApi.buildProjectFileTranslation(
      projectId,
      fileId,
      {
        targetLanguageId
      }
    )
    const response = await fetch(downloadLink.data.url)
    const translations = await response.json()
    console.log(translations)
  }

  return {
    getProjects,
    createFile,
    downloadTranslations
  }
}
