import Link from "next/link";
import {
  FaBoxOpen,
  FaEnvelopeOpenText,
  FaStar,
  FaImages,
  FaBlog,
  FaQuestionCircle,
} from "react-icons/fa";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Packages",
      desc: "Create & manage Umrah packages",
      href: "/admin/packages",
      icon: <FaBoxOpen className="text-3xl" />,
    },
    {
      title: "Inquiries",
      desc: "View customer inquiries",
      href: "/admin/inquiries",
      icon: <FaEnvelopeOpenText className="text-3xl" />,
    },
    {
      title: "Reviews",
      desc: "Approve & manage reviews",
      href: "/admin/reviews",
      icon: <FaStar className="text-3xl" />,
    },
    {
      title: "Gallery",
      desc: "Manage website images",
      href: "/admin/gallery",
      icon: <FaImages className="text-3xl" />,
    },
    {
      title: "Blog",
      desc: "Create & edit blog posts",
      href: "/admin/blog",
      icon: <FaBlog className="text-3xl" />,
    },
    {
      title: "FAQ",
      desc: "Manage frequently asked questions",
      href: "/admin/faq",
      icon: <FaQuestionCircle className="text-3xl" />,
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage Barakah Travels website & CRM
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col gap-4 border border-gray-100"
          >
            <div className="text-primary">{card.icon}</div>
            <div>
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-12 text-sm text-gray-500">
        Logged in as <strong>Admin</strong> • Barakah CRM
      </div>
    </div>
  );
}
