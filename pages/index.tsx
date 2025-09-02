import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

interface HomeProps {
  firstProject: string | null;
}

export default function Home({ firstProject }: HomeProps) {
  const router = useRouter();

  useEffect(() => {
    if (firstProject) {
      router.replace(`/projects/${firstProject}`);
    } else {
      router.replace('/404');
    }
  }, [firstProject, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  let firstProject: string | null = null;

  try {
    if (fs.existsSync(projectsDirectory)) {
      const projectDirs = fs.readdirSync(projectsDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort();

      if (projectDirs.length > 0) {
        firstProject = projectDirs[0];
      }
    }
  } catch (error) {
    console.error('Error reading projects directory:', error);
  }

  return {
    props: {
      firstProject,
    },
  };
};