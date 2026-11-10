import { base44 } from '@/api/base44Client';

export async function uploadPublicFile(file) {
  const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
  return file_url;
}

export async function uploadPrivateFile(file) {
  const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
  return file_uri;
}