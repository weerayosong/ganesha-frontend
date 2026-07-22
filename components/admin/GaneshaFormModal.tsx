"use client";

import { useState, useEffect } from "react";
import { FaXmark, FaFloppyDisk, FaSpinner, FaImage } from "react-icons/fa6";

interface GaneshaInitialData {
    _id?: string;
    order: number | string;
    nameTH: string;
    nameEN: string;
    prays: number;
    meaning?: string;
    color?: string;
    vehicle?: string;
    weapons?: string;
    imageUrl?: string;
    mantra?: string;
}

interface FormDataState {
    order: number | string;
    nameTH: string;
    nameEN: string;
    prays: number | string;
    meaning: string;
    color: string;
    vehicle: string;
    weapons: string;
    imageUrl: string;
    mantra: string;
}

interface GaneshaFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    onSuccess?: () => void;
    initialData?: GaneshaInitialData | null;
}

const emptyForm: FormDataState = {
    order: "",
    nameTH: "",
    nameEN: "",
    prays: 0,
    meaning: "",
    color: "",
    vehicle: "",
    weapons: "",
    imageUrl: "",
    mantra: "",
};

export default function GaneshaFormModal({
    isOpen,
    onClose,
    mode,
    onSuccess,
    initialData,
}: GaneshaFormModalProps) {
    const [formData, setFormData] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (mode === "edit" && initialData) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFormData({
                    order: initialData.order || "",
                    nameTH: initialData.nameTH || "",
                    nameEN: initialData.nameEN || "",
                    prays: initialData.prays || 0,
                    meaning: initialData.meaning || "",
                    color: initialData.color || "",
                    vehicle: initialData.vehicle || "",
                    weapons: initialData.weapons || "",
                    imageUrl: initialData.imageUrl || "",
                    mantra: initialData.mantra || "",
                });
            } else {
                setFormData(emptyForm);
            }
        }
    }, [isOpen, mode, initialData]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "order" || name === "prays"
                    ? Number(value) || ""
                    : value,
        }));
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload-image", {
                method: "POST",
                body: uploadData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server Error: ${res.status} - ${errorText}`);
            }

            const data = await res.json();

            if (data.secure_url) {
                setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("ไม่สามารถอัปโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const url =
                mode === "edit"
                    ? `/api/ganeshas/${initialData?._id}`
                    : "/api/ganeshas";
            const method = mode === "edit" ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                if (onSuccess) onSuccess();
                onClose();
            } else {
                alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-9999 flex items-start md:items-center justify-center pt-24 pb-6 px-4 md:p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-neutral-900 border border-amber-900/40 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto hide-scrollbar shadow-2xl relative animate-in zoom-in-95 duration-300">
                <div className="sticky top-0 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 p-4 flex items-center justify-between z-10">
                    <h2 className="text-lg font-serif font-bold text-amber-500">
                        {mode === "add"
                            ? "เพิ่มข้อมูลปางใหม่"
                            : "แก้ไขข้อมูลปาง"}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting || isUploadingImage}
                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                        <FaXmark className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-4">
                    <div className="bg-neutral-950/50 p-4 rounded-xl border border-neutral-800/50">
                        <label className="block text-[11px] text-neutral-400 mb-2 uppercase tracking-wider">
                            รูปภาพประจำปาง
                        </label>
                        <div className="flex items-center gap-4">
                            {formData.imageUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-amber-900/50 shadow-md"
                                />
                            ) : (
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-neutral-600">
                                    <FaImage className="w-6 h-6" />
                                </div>
                            )}

                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploadingImage || isSubmitting}
                                    className="w-full text-sm text-neutral-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-xs file:font-bold
                                        file:bg-amber-600/20 file:text-amber-500
                                        hover:file:bg-amber-600/40 file:transition-colors
                                        file:cursor-pointer disabled:opacity-50 cursor-pointer"
                                />
                                {isUploadingImage && (
                                    <div className="mt-2 text-xs text-amber-500 flex items-center gap-1.5">
                                        <FaSpinner className="w-3 h-3 animate-spin" />
                                        <span>
                                            กำลังอัปโหลดรูปภาพไปยัง
                                            Cloudinary...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                ลำดับปาง
                            </label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                placeholder="เช่น 1"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                ชื่อปาง (ภาษาไทย)
                            </label>
                            <input
                                type="text"
                                name="nameTH"
                                value={formData.nameTH}
                                onChange={handleChange}
                                placeholder="เช่น พาละ คณปติ"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                ชื่อปาง (ภาษาอังกฤษ)
                            </label>
                            <input
                                type="text"
                                name="nameEN"
                                value={formData.nameEN}
                                onChange={handleChange}
                                placeholder="เช่น Bala Ganapati"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                จำนวนสักการะ (ครั้ง)
                            </label>
                            <input
                                type="number"
                                name="prays"
                                value={formData.prays}
                                onChange={handleChange}
                                placeholder="เช่น 0"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                            ความหมาย / พรที่ประทาน
                        </label>
                        <textarea
                            name="meaning"
                            value={formData.meaning}
                            onChange={handleChange}
                            rows={2}
                            placeholder="คำอธิบายความหมายของปางนี้..."
                            className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none resize-none"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                วรรณะ (ผิวกาย)
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                placeholder="เช่น สีแดงส้ม"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                                พาหนะ / ท่าประทับ
                            </label>
                            <input
                                type="text"
                                name="vehicle"
                                value={formData.vehicle}
                                onChange={handleChange}
                                placeholder="เช่น ประทับนั่งบนดอกบัว"
                                className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                            สิ่งของมงคล / อาวุธ (คั่นด้วยลูกน้ำ)
                        </label>
                        <input
                            type="text"
                            name="weapons"
                            value={formData.weapons}
                            onChange={handleChange}
                            placeholder="เช่น ขนมโมทกะ, งา, บ่วงบาศ, ขวาน"
                            className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none"
                        />
                    </div>

                    {/* 5. เพิ่มฟอร์มสำหรับกรอกคาถาบูชา */}
                    <div>
                        <label className="block text-[11px] text-neutral-400 mb-1 uppercase tracking-wider">
                            คาถาบูชา
                        </label>
                        <textarea
                            name="mantra"
                            value={formData.mantra}
                            onChange={handleChange}
                            rows={2}
                            placeholder="เช่น โอม ศรี คเณศายะ นะมะฮา..."
                            className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 outline-none resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="p-4 border-t border-neutral-800 flex justify-end gap-2 bg-neutral-900 rounded-b-xl">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting || isUploadingImage}
                        className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || isUploadingImage}
                        className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <FaFloppyDisk className="w-3.5 h-3.5" />
                        )}
                        <span>
                            {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
