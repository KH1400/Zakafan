
"use client";

import * as React from "react";
import {
  File,
  PlusCircle,
  Image as ImageIcon,
  Video,
  ListFilter,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


type Content = {
    id: string;
    title: string;
    type: "مقاله (HTML)" | "تصویر" | "ویدیو";
    status: "منتشر شده" | "پیش‌نویس" | "بازبینی";
    date: string;
}

const sampleContent: Content[] = [
    { id: "CNT-001", title: "تحلیل برنامه موشکی ایران", type: "مقاله (HTML)", status: "منتشر شده", date: "۱۴۰۳/۰۴/۰۱" },
    { id: "CNT-002", title: "گالری تصاویر رزمایش ذوالفقار", type: "تصویر", status: "پیش‌نویس", date: "۱۴۰۳/۰۴/۰۵" },
    { id: "CNT-003", title: "مستند عملیات فتح‌المبین", type: "ویدیو", status: "منتشر شده", date: "۱۴۰۳/۰۳/۱۵" },
    { id: "CNT-004", title: "اینفوگرافیک توان پهپادی", type: "تصویر", status: "منتشر شده", date: "۱۴۰۳/۰۴/۱۰" },
    { id: "CNT-005", title: "بررسی نبردهای کلیدی", type: "مقاله (HTML)", status: "بازبینی", date: "۱۴۰۳/۰۴/۱۲" },
    { id: "CNT-006", title: "مصاحبه با کارشناس نظامی", type: "ویدیو", status: "منتشر شده", date: "۱۴۰۳/۰۲/۲۰" },
];

const statusMap = {
    'published': 'منتشر شده',
    'draft': 'پیش‌نویس',
    'review': 'بازبینی'
}

const typeMap = {
    'article': 'مقاله (HTML)',
    'image': 'تصویر',
    'video': 'ویدیو'
}

export default function ContentPage() {
    const { toast } = useToast();
    const [contentItems, setContentItems] = React.useState<Content[]>(sampleContent);
    const [activeTab, setActiveTab] = React.useState('all');
    const [statusFilter, setStatusFilter] = React.useState<Set<string>>(new Set(Object.values(statusMap)));
    const [isDeleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
    const [isFormDialogOpen, setFormDialogOpen] = React.useState(false);
    const [contentToDelete, setContentToDelete] = React.useState<Content | null>(null);
    const [contentToEdit, setContentToEdit] = React.useState<Content | null>(null);
    const [formContentType, setFormContentType] = React.useState<Content['type'] | ''>(typeMap.article);

    const filteredContent = React.useMemo(() => {
        return contentItems.filter(item => {
            const tabFilter = activeTab === 'all' || item.type.includes(typeMap[activeTab as keyof typeof typeMap]);
            const statusFilterMatch = statusFilter.has(item.status);
            return tabFilter && statusFilterMatch;
        });
    }, [contentItems, activeTab, statusFilter]);

    const handleStatusFilterChange = (status: string, checked: boolean) => {
        const newFilter = new Set(statusFilter);
        if (checked) {
            newFilter.add(status);
        } else {
            newFilter.delete(status);
        }
        setStatusFilter(newFilter);
    };

    const openDeleteAlert = (content: Content) => {
        setContentToDelete(content);
        setDeleteAlertOpen(true);
    };

    const handleDeleteContent = () => {
        if (!contentToDelete) return;
        setContentItems(contentItems.filter(item => item.id !== contentToDelete.id));
        toast({
            title: "محتوا حذف شد",
            description: `محتوای "${contentToDelete.title}" با موفقیت حذف شد.`,
        });
        setDeleteAlertOpen(false);
        setContentToDelete(null);
    };
    
    const handleOpenFormDialog = (content: Content | null) => {
        setContentToEdit(content);
        setFormContentType(content ? content.type : typeMap.article);
        setFormDialogOpen(true);
    };

    const handleSaveContent = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const type = formData.get('type') as Content['type'];
        const status = formData.get('status') as Content['status'];
        const file = formData.get('file-upload') as File;

        if ((type === typeMap.image || type === typeMap.video) && file && file.size > 0) {
            toast({
                title: "فایل انتخاب شد",
                description: `فایل "${file.name}" برای آپلود انتخاب شد. این یک نمونه اولیه است و آپلود واقعی انجام نمی‌شود.`,
            });
        }

        const newContent: Content = {
            id: contentToEdit ? contentToEdit.id : `CNT-00${contentItems.length + 1}`,
            title,
            type,
            status,
            date: new Date().toLocaleDateString('fa-IR'),
        };

        if (contentToEdit) {
            setContentItems(contentItems.map(c => c.id === contentToEdit.id ? newContent : c));
            toast({ title: "محتوا ویرایش شد", description: `محتوای "${title}" با موفقیت به‌روزرسانی شد.` });
        } else {
            setContentItems([newContent, ...contentItems]);
            toast({ title: "محتوا اضافه شد", description: `محتوای "${title}" با موفقیت ایجاد شد.` });
        }
        setFormDialogOpen(false);
        setContentToEdit(null);
    };
    
    const handleExport = () => {
        toast({
            title: "در حال آماده‌سازی خروجی...",
            description: "این قابلیت هنوز پیاده‌سازی نشده است.",
            variant: "destructive"
        })
    }

  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian" dir="rtl">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">همه</TabsTrigger>
                    <TabsTrigger value="article">مقالات</TabsTrigger>
                    <TabsTrigger value="image">تصاویر</TabsTrigger>
                    <TabsTrigger value="video">ویدیوها</TabsTrigger>
                </TabsList>
                <div className="mr-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    فیلتر
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>فیلتر بر اساس وضعیت</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={statusFilter.has(statusMap.published)} onCheckedChange={(checked) => handleStatusFilterChange(statusMap.published, !!checked)}>
                                {statusMap.published}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={statusFilter.has(statusMap.draft)} onCheckedChange={(checked) => handleStatusFilterChange(statusMap.draft, !!checked)}>
                                {statusMap.draft}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={statusFilter.has(statusMap.review)} onCheckedChange={(checked) => handleStatusFilterChange(statusMap.review, !!checked)}>
                                {statusMap.review}
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            خروجی
                        </span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1" onClick={() => handleOpenFormDialog(null)}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            افزودن محتوا
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card>
                    <CardHeader>
                        <CardTitle>مدیریت محتوا</CardTitle>
                        <CardDescription>
                            محتوای سایت را در اینجا مدیریت، ویرایش یا حذف کنید.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Icon</span>
                                    </TableHead>
                                    <TableHead>عنوان</TableHead>
                                    <TableHead>نوع</TableHead>
                                    <TableHead>وضعیت</TableHead>
                                    <TableHead>تاریخ ویرایش</TableHead>
                                    <TableHead>
                                        <span className="sr-only">عملیات</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredContent.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            {item.type === 'مقاله (HTML)' && <File className="w-6 h-6 text-muted-foreground" />}
                                            {item.type === 'تصویر' && <ImageIcon className="w-6 h-6 text-muted-foreground" />}
                                            {item.type === 'ویدیو' && <Video className="w-6 h-6 text-muted-foreground" />}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === 'منتشر شده' ? 'default' : 'secondary'}>
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleOpenFormDialog(item)}>ویرایش</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => openDeleteAlert(item)}>حذف</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            نمایش <strong>{filteredContent.length}</strong> از <strong>{contentItems.length}</strong> محتوا
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>

        {/* Add/Edit Content Dialog */}
        <Dialog open={isFormDialogOpen} onOpenChange={setFormDialogOpen}>
            <DialogContent className="sm:max-w-[425px] font-persian" dir="rtl">
                <form onSubmit={handleSaveContent}>
                    <DialogHeader>
                        <DialogTitle>{contentToEdit ? 'ویرایش محتوا' : 'افزودن محتوای جدید'}</DialogTitle>
                        <DialogDescription>
                            {contentToEdit ? 'اطلاعات محتوا را ویرایش کنید.' : 'اطلاعات محتوای جدید را وارد کنید.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">عنوان</Label>
                            <Input id="title" name="title" defaultValue={contentToEdit?.title || ''} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">نوع</Label>
                            <Select name="type" defaultValue={contentToEdit?.type || typeMap.article} required onValueChange={(value) => setFormContentType(value as Content['type'])}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="یک نوع انتخاب کنید" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={typeMap.article}>{typeMap.article}</SelectItem>
                                    <SelectItem value={typeMap.image}>{typeMap.image}</SelectItem>
                                    <SelectItem value={typeMap.video}>{typeMap.video}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">وضعیت</Label>
                             <Select name="status" defaultValue={contentToEdit?.status || statusMap.draft} required>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="یک وضعیت انتخاب کنید" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={statusMap.published}>{statusMap.published}</SelectItem>
                                    <SelectItem value={statusMap.draft}>{statusMap.draft}</SelectItem>
                                    <SelectItem value={statusMap.review}>{statusMap.review}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {formContentType === typeMap.article && (
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="html-content" className="text-right pt-2">محتوای HTML</Label>
                                <Textarea id="html-content" name="html-content" placeholder="کد HTML مقاله را اینجا وارد کنید..." className="col-span-3 min-h-[150px]" />
                            </div>
                        )}
                        {(formContentType === typeMap.image || formContentType === typeMap.video) && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file-upload" className="text-right">آپلود فایل</Label>
                                <Input id="file-upload" name="file-upload" type="file" className="col-span-3" />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                         <Button type="button" variant="secondary" onClick={() => setFormDialogOpen(false)}>لغو</Button>
                        <Button type="submit">ذخیره</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
            <AlertDialogContent dir="rtl" className="font-persian">
                <AlertDialogHeader>
                    <AlertDialogTitle>آیا از حذف محتوا مطمئن هستید؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        این عمل قابل بازگشت نیست. با این کار محتوای <span className="font-bold">"{contentToDelete?.title}"</span> برای همیشه حذف خواهد شد.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>لغو</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteContent} className="bg-destructive hover:bg-destructive/90">
                        بله، حذف کن
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}

    