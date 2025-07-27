function About() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-4">About this application</h1>
      <p className="text-lg mb-2">
        This application is a Star Wars character search tool built using React
        and the SWAPI API.
      </p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Author</h2>
        <p className="text-lg">Name: Sergey Kulchytski</p>
        <p className="text-lg">
          GitHub:{' '}
          <a
            href="https://github.com/Serg8"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
            data-testid="test-github-link"
          >
            GitHub
          </a>
        </p>
        <p className="text-lg">
          Course:{' '}
          <a
            href="https://rs.school/courses/reactjs"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            RS School React Course
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
