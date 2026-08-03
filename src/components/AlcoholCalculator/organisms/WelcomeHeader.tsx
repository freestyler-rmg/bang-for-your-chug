export default function WelcomeHeader() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl">🍻Bang for Your Chug🍻</h1>
        <p className="mb-2">
          Calculate and compare your <br className="md:hidden" />
          alcoholic beverages of choice!
          <br className="mb-2 md:mb-0" />
          Find out which one has the highest alcohol content <br className="md:hidden" />
          and how expensive it is per ml or %.
        </p>
        <p className="text-xs">Fill out the form below more than once to see the comparison.</p>
      </div>
    </>
  );
}
