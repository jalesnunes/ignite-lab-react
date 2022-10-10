import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import { Link, useParams } from "react-router-dom";

interface LessonCardProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function LessonCard(props: LessonCardProps) {
  const { slug } = useParams< {slug: string}>()
  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormatted = format(props.availableAt, "EEEE' • ' MMM' • ' d' • 'k':'mm b")

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div className={`w-[301px] h-[97px] rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : ''}`}>
        <header className="flex justify-between items-center">
          {isLessonAvailable ? (
            <span className={`flex items-center justify-center gap-2 text-sm text-blue-500 ${isActiveLesson ? 'text-white' : ''}`}>
              <CheckCircle size={20} />
              Released Content
            </span>
          ) : (
            <span className=" flex items-center justify-center gap-2 text-sm text-orange-500">
              <Lock size={20} />
              Soon
            </span>
          )}

          <span className={`text-xs rounded py-[2px] px-2 text-white border border-green-300 font-bold ${isActiveLesson ? 'border-white' : ''}`}>
            {props.type === "live" ? "LIVE" : "CLASS"}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block ">{props.title}</strong>
      </div>
    </Link>
  );
}
