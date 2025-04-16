import { cn } from "@/lib/utils";

const Table = ({ ref, className, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);
Table.displayName = "Table";

const TableHeader = ({ ref, className, ...props }) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
);
TableHeader.displayName = "TableHeader";

const TableBody = ({ ref, className, ...props }) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
);
TableBody.displayName = "TableBody";

const TableFooter = ({ ref, className, ...props }) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-slate-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-slate-800/50",
      className
    )}
    {...props}
  />
);
TableFooter.displayName = "TableFooter";

const TableRow = ({ ref, className, ...props }) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-category-selected-bg-color data-[state=selected]:bg-category-selected-bg-color dark:text-white",
      className
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";

const TableHead = ({ ref, className, ...props }) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400",
      className
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";

const TableCell = ({ ref, className, ...props }) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);
TableCell.displayName = "TableCell";

const TableCaption = ({ ref, className, ...props }) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
