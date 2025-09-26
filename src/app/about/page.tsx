import Image from 'next/image';
import GridTextCard from '@/components/ui/GridTextCard';

export default function AboutPage() {
	return (
		<main className="min-h-screen pb-24 rounded-b-[80px] font-chillax px-4 py-12">
			<section className="w-full flex justify-center items-center py-8 sm:py-12 bg-[#FAFAFA]">
				<div className="text-center max-w-2xl mx-auto" style={{ fontFamily: 'Chillax, sans-serif' }}>
					<h2 className="text-[#17214D] font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-snug">
						With expertise across<br className="sm:hidden" />
						ventures and enterprises,<br className="sm:hidden" />
						Synexis.ai delivers next. 
					</h2>
				</div>
				</section>

			{/* Team grid section */}
			<section className="relative w-full h-[819px] flex items-center justify-center  mt-8">
				{/* Background image grid */}
				<div className="absolute  w-full h-full">
					<Image
						src="/images/img14.png"
						alt="Team grid background"
						fill
						className="object-cover "
						priority
					/>
				</div>
			
			</section>
      <section className="w-full bg-white py-12">
  <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
      
      {/* Stat 1 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">250+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Projects Completed</p>
      </div>

      {/* Stat 2 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">180+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Happy Clients</p>
      </div>

      {/* Stat 3 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">10+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Years of Experience</p>
      </div>

      {/* Stat 4 */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">50+</h3>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Team Members</p>
      </div>

    </div>
  </div>
</section>
	<section className="w-full flex justify-center items-center py-10 bg-white">
				<div
					className="max-w-3xl mx-auto "
					style={{
						fontFamily: 'Chillax, sans-serif',
						fontWeight: 300,
						fontStyle: 'Light',
						fontSize: '25px',
						lineHeight: '40px',
						letterSpacing: '-0.06px',
						verticalAlign: 'middle',
					}}
				>
					We collaborate with forward-thinking leaders, where our generative AI experts provide strategic insights that will reshape tomorrow. Our team of AI engineers, developers, and data scientists supports clients through their digital transformation, enhancing capabilities across their organization. With over 200 innovative solutions delivered and counting, we are dedicated to empowering businesses with cutting-edge generative AI expertise for a future-proof world.
				</div>
			</section>



				
				<section className="w-full bg-[#17214D] py-16">
					<div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* First card: text only, custom background */}
							<div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col justify-center items-start p-8 bg-cover bg-center rounded-xl min-h-[260px]" >
								<h2 className="text-white font-bold text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'Chillax, sans-serif' }}>
									Where Collaboration<br />
									<span className="italic font-normal">Meets Creativity</span>
								</h2>
								<p className="text-white text-base sm:text-lg opacity-80 mt-2" style={{ fontFamily: 'Chillax, sans-serif' }}>
									We foster an open, inclusive culture where teamwork, smart thinking, and curiosity spark innovation—balancing growth, fun, and shared success.
								</p>
							</div>
              {/* Other cards: images only */}
            <GridTextCard title="Open & Inclusive" description="Everyone's voice matters, and ideas are welcomed from every corner of the team." />
							<div className="rounded-xl overflow-hidden bg-[#22306A] min-h-[260px] flex">
								<Image src="/images/grid_3.png" alt="Grid 3" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<GridTextCard title="Collaboration at the Core" description="We thrive on teamwork, solving challenges together, and celebrating wins as one." />
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_6.png" alt="Grid 6" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<GridTextCard title="Creative Freedom" description="Encouraging curiosity and experimentation so great ideas can spark anywhere, anytime." />
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_8.png" alt="Grid 8" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<GridTextCard title="Celebrating Diversity" description="Different perspectives make us stronger, more creative, and better problem-solvers." />
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_9.png" alt="Grid 9" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_11.png" alt="Grid 11" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_12.png" alt="Grid 12" width={400} height={260} className="w-full h-full object-cover" />
							</div>
							<div className="rounded-xl overflow-hidden bg-[#263049] min-h-[260px] flex">
								<Image src="/images/grid_14.png" alt="Grid 14" width={400} height={260} className="w-full h-full object-cover" />
							</div>
																				
						{/* Text only card */}

						<GridTextCard title="Client-Centric Approach" description="At Synexis.ai, our clients are at the heart of everything we do. We prioritize understanding your unique needs and challenges, delivering tailored solutions that drive real business value and foster long-term partnerships." />
            <GridTextCard title="Excellence in Execution" description="We are committed to delivering excellence in every project we undertake. From initial concept to final deployment, our rigorous processes and attention to detail ensure that we exceed expectations and deliver high-quality, reliable solutions." />
            <GridTextCard title="Empowering Through Technology" description="Our mission is to empower businesses through innovative technology solutions. By leveraging the latest advancements in AI and software development, we help our clients unlock new opportunities and achieve their strategic goals." />							
            <GridTextCard title="Empowering Through Technology" description="Our mission is to empower businesses through innovative technology solutions. By leveraging the latest advancements in AI and software development, we help our clients unlock new opportunities and achieve their strategic goals." />							
            <GridTextCard title="Empowering Through Technology" description="Our mission is to empower businesses through innovative technology solutions. By leveraging the latest advancements in AI and software development, we help our clients unlock new opportunities and achieve their strategic goals." />							

						</div>
					</div>
				</section>
	{/* Expertise & Technologies Section */}
					<section className="w-full py-16 bg-white">
						<div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12 px-4 sm:px-8 lg:px-16 items-center">
							{/* Left: Text Content */}
							<div className="flex-1 mb-10 lg:mb-0">
								<h2 className="text-[#17214D] font-medium text-2xl sm:text-4xl lg:text-5xl mb-6" style={{ fontFamily: 'Chillax, sans-serif' }}>
									Expertise across a range of technologies
								</h2>
								<p className="text-[#17214D] text-base sm:text-lg mb-6" style={{ fontFamily: 'Chillax, sans-serif' }}>
									Markovate’s team of <span className="font-bold">generative AI experts</span> relies on an advanced suite of technologies like AI, ML, Generative AI, Blockchain, Web3, Mobile, and more to drive innovation. Incorporating machine learning frameworks, cloud computing, and data analytics tools, our tech stack is designed for scalability, reliability, and optimum performance. It’s the backbone that ensures each software solution we deliver meets industry standards and exceeds client expectations.
								</p>
								<button className="bg-[#2563eb] text-white rounded-full px-6 py-3 font-medium text-base shadow hover:bg-[#1741a3] transition flex items-center gap-2">
									Case Studies <span className="text-xl">→</span>
								</button>
							</div>
							{/* Right: 3x3 Grid */}
									<div className="flex-1 grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-lg">
										{Array.from({ length: 9 }).map((_, i) => (
											<div key={i} className="bg-[#17214D] rounded-xl relative h-32 w-full overflow-hidden flex items-center justify-center">
												<img src={`/images/grid_2_${i+1}.png`} alt={`Grid2 ${i+1}`} className="w-full h-full object-cover" />
											</div>
										))}
									</div>
						</div>
					</section>
		{/* Hero Section with Background */}
		<section className="relative w-full flex items-center justify-center py-16">
			<div className="absolute inset-0 w-full h-full">
          <Image
      src="/images/img15.png"
      alt="Background"
      fill
      className="object-cover rounded-[32px]"
      priority
    />
				<div className="absolute inset-0 bg-black bg-opacity-40 rounded-[32px]" />
			</div>
			<div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto">
				<h1 className="text-white font-bold text-3xl sm:text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Chillax, sans-serif' }}>
					Shaping the next<br />era together.
				</h1>
				<p className="text-white text-lg sm:text-xl font-light mb-8" style={{ fontFamily: 'Chillax, sans-serif' }}>
					Partner with us to unlock innovation and accelerate your digital future.
				</p>
				<button className="bg-white text-[#17214D] rounded-full px-6 py-3 font-medium text-base shadow hover:bg-gray-200 transition">
					Schedule A Call
				</button>
			</div>
		</section>


		</main>
	);
}
