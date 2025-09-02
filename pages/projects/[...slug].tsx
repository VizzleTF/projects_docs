import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface ProjectPageProps {
  projectSlug: string;
  pageSlug: string;
  title: string;
  description: string;
  content: string;
  date?: string;
  pages: Array<{
    slug: string;
    title: string;
    isActive: boolean;
  }>;
  allProjects: Array<{
    slug: string;
    title: string;
    cleanName: string;
    isActive: boolean;
  }>;
}

export default function ProjectPage({
  projectSlug,
  pageSlug,
  title,
  description,
  content,
  date,
  pages,
  allProjects
}: ProjectPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>{`${title} - My Project Pages`}</title>
        <meta name="description" content={description} />
      </Head>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Global Project Navigation */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="flex flex-wrap items-center gap-2">
              {allProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${project.isActive
                      ? 'bg-purple-500/50 text-white border border-purple-400/50 shadow-lg'
                      : 'text-purple-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                    }`}
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Pages</h3>
              <nav className="space-y-2">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/projects/${projectSlug}${page.slug === 'index' ? '' : `/${page.slug}`}`}
                    className={`block px-3 py-2 rounded-lg transition-all duration-300 ${page.isActive
                        ? 'bg-purple-500/30 text-white border border-purple-400/50'
                        : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {page.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <header className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                  {title}
                </h1>
                {description && (
                  <p className="text-xl text-purple-200 mb-4">{description}</p>
                )}
                {date && (
                  <p className="text-sm text-purple-300">Last updated: {date}</p>
                )}
              </header>

              <div className="prose prose-lg prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  let paths: { params: { slug: string[] } }[] = [];

  try {
    const projectDirs = fs.readdirSync(projectsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const projectDir of projectDirs) {
      const projectPath = path.join(projectsDirectory, projectDir);
      const files = fs.readdirSync(projectPath)
        .filter(file => file.endsWith('.md'));

      for (const file of files) {
        const pageSlug = file.replace(/\.md$/, '');
        if (pageSlug === 'index') {
          // Main project page
          paths.push({ params: { slug: [projectDir] } });
        } else {
          // Sub-pages
          paths.push({ params: { slug: [projectDir, pageSlug] } });
        }
      }
    }
  } catch (error) {
    console.log('Projects directory not found or error reading:', error);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = params?.slug as string[];
  const projectSlug = slugArray[0];
  const pageSlug = slugArray[1] || 'index';

  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const projectPath = path.join(projectsDirectory, projectSlug);
  const filePath = path.join(projectPath, `${pageSlug}.md`);

  try {
    // Read the current page
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process markdown content
    const processedContent = await remark()
      .use(html)
      .process(content);

    const contentHtml = processedContent.toString();

    // Get all pages for this project
    const allFiles = fs.readdirSync(projectPath)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const slug = file.replace(/\.md$/, '');
        const pageFilePath = path.join(projectPath, file);
        const pageFileContents = fs.readFileSync(pageFilePath, 'utf8');
        const { data: pageData } = matter(pageFileContents);

        return {
          slug,
          title: pageData.title || slug,
          isActive: slug === pageSlug,
        };
      })
      .sort((a, b) => {
        // Put index first, then alphabetical
        if (a.slug === 'index') return -1;
        if (b.slug === 'index') return 1;
        return a.title.localeCompare(b.title);
      });

    // Get all projects for global navigation
    const allProjectDirs = fs.readdirSync(projectsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort(); // Sort to ensure 00_, 01_, etc. are in order

    const allProjects = allProjectDirs.map(dirName => {
      const cleanName = dirName.replace(/^\d+_/, ''); // Remove number prefix
      const indexPath = path.join(projectsDirectory, dirName, 'index.md');

      let title = cleanName;

      try {
        const fileContents = fs.readFileSync(indexPath, 'utf8');
        const { data: projectData } = matter(fileContents);
        if (projectData.title) title = projectData.title;
      } catch (error) {
        // Use clean name as fallback
      }

      return {
        slug: dirName,
        title,
        cleanName,
        isActive: dirName === projectSlug,
      };
    });

    return {
      props: {
        projectSlug,
        pageSlug,
        title: data.title || pageSlug,
        description: data.description || '',
        content: contentHtml,
        date: data.date ? data.date.toString() : null,
        pages: allFiles,
        allProjects,
      },
    };
  } catch (error) {
    console.error('Error reading project page:', error);
    return {
      notFound: true,
    };
  }
};