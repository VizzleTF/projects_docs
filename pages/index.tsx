import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';

export default function Home() {
  // This component will never render because of the redirect
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');

  try {
    // Check if directory exists
    if (!fs.existsSync(projectsDirectory)) {
      console.error('Projects directory does not exist:', projectsDirectory);
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    const projectDirs = fs.readdirSync(projectsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort(); // Sort to ensure 00_, 01_, etc. are in order

    console.log('Found project directories:', projectDirs);

    if (projectDirs.length > 0) {
      // Redirect to the first project (00_*)
      const firstProject = projectDirs[0];
      console.log('Redirecting to first project:', firstProject);
      return {
        redirect: {
          destination: `/projects/${firstProject}`,
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error('Error reading projects directory:', error);
  }

  // If no projects found, redirect to a 404 or show empty state
  return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  };
};